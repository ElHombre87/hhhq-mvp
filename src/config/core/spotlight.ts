// import _ from 'lodash';
import { SpotlightAction } from '@mantine/spotlight';

export type TActionsRecord = Record<string, SpotlightAction>;

/**
 * @dev TODO: Centralize spotlight configuration in here.
 * Ideally we would want to have everything, including the triggers, in here,
 * but since some of the spotlight actions may require callbacks from hooks
 * or other stuff, We may want to define a strongly typed system (similar to the
 * hotkeys) to setup the 'static' parts of the actions in here - such as title,
 * description and so on - and allow/require an override in the actual
 * components.
 */
export default {};
