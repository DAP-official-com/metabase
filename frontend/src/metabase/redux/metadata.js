import { handleActions, combineReducers, AngularResourceProxy, createAction, createThunkAction } from "metabase/lib/redux";
import i from "icepick";

const FETCH_DATABASE_METADATA = "metabase/metadata/FETCH_DATABASE_METADATA";
const FETCH_DATABASES = "metabase/metadata/FETCH_DATABASES";
const SET_REQUEST_STATE = "metabase/metadata/SET_REQUEST_STATE";

import { augmentDatabase } from "metabase/lib/table";

const MetabaseApi = new AngularResourceProxy("Metabase", ["db_list", "dataset", "dataset_duration", "db_metadata"]);

const setRequestState = createAction(SET_REQUEST_STATE, undefined, (payload, meta) => meta);

export const fetchDatabases = createThunkAction(FETCH_DATABASES, (reload = false) => {
    return async (dispatch, getState) => {
        try {
            const requestState = i.getIn(getState(), ["metadata", "requestState", "databases"]);
            if (requestState == null || reload) {
                dispatch(setRequestState({ type: "databases", state: "LOADING" }));
                const databases = await MetabaseApi.db_list();
                const databaseMap = databases
                    .filter(database => database.id !== undefined)
                    //TODO: think about returning a map directly from the backend?
                    // for constant time random access by id
                    .reduce((map, database) => i.assoc(map, database.id, database), {});
                dispatch(setRequestState({ type: "databases", state: "LOADED" }));

                return databaseMap;
            }

            const existingDatabases = i.getIn(getState(), ["metadata", "databases"])
            return existingDatabases;
        }
        catch(error) {
            dispatch(setRequestState(error, { type: 'databases' }));
            return {};
        }
    };
});

export const fetchDatabaseMetadata = createThunkAction(FETCH_DATABASE_METADATA, function(dbId, reload = false) {
    return async function(dispatch, getState) {
        try {
            const requestState = i.getIn(getState(), ["metadata", "requestState", "database", dbId]);
            if (!requestState || reload) {
                dispatch(setRequestState({ type: "database", id: dbId, state: "LOADING" }));
                let databaseMetadata = await MetabaseApi.db_metadata({ dbId });
                augmentDatabase(databaseMetadata);
                dispatch(setRequestState({ type: "database", id: dbId, state: "LOADED" }));

                return databaseMetadata;
            }

            const existingDatabase = i.getIn(getState(), ["metadata", "databases", dbId]);
            return existingDatabase;
        }
        catch(error) {
            dispatch(setRequestState(error, { type: 'database', id: dbId }));
            return {};
        }
    };
});

const databases = handleActions({
    [FETCH_DATABASES]: { next: (state, { payload }) => payload },
    [FETCH_DATABASE_METADATA]: { next: (state, { payload }) => ({ ...state, [payload.id]: payload }) }
}, {});

const requestState = handleActions({
    [SET_REQUEST_STATE]: {
        next: (state, { payload }) => payload.id ?
            i.assocIn(state, [payload.type, payload.id], payload.state) :
            i.assoc(state, payload.type, payload.state),
        throw: (state, { payload, meta, error }) => meta.id ?
            i.assocIn(state, [meta.type, meta.id, 'error'], payload) :
            i.assocIn(state, [meta.type, 'error'], payload)
    }
}, {});

export default combineReducers({
    requestState,
    databases
});
