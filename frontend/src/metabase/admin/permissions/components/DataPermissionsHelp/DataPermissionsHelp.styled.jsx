import styled from "styled-components";
import Icon from "metabase/components/Icon";
import { color } from "metabase/lib/colors";

export const PermissionIcon = styled(Icon).attrs({ size: 16 })`
  padding-top: 12px;
  padding-right: 0.25rem;
  vertical-align: bottom;
  color: ${props => color(props.color)};
`;
