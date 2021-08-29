import styled from "styled-components";
import Icon from "metabase/components/Icon";
import { color } from "metabase/lib/colors";

export const DataPermissionsHelpRoot = styled.div`
  h2 + h3 {
    margin-top: 1rem;
  }

  h2 {
    margin-top: 2rem;
    font-size: 18px;
    line-height: 20px;
  }

  h3 {
    margin-top: 1.5rem;
    font-size: 14px;
    line-height: 20px;
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }
`;

export const PermissionIcon = styled(Icon).attrs({ size: 16 })`
  padding-right: 0.375rem;
  vertical-align: text-bottom;
  color: ${props => color(props.color)};
`;

export const DataPermissionsHelpContent = styled.div`
  padding: 1rem 2rem;
`;

export const DataPermissionsHelpFooter = styled.footer`
  padding: 2rem;
  border-top: 1px solid ${color("border")};
`;
