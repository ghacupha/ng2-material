import {provide} from "@angular/core";
import {MdAnchor, MdButton} from "./components/button/button";
import {MdContent} from "./components/content/content";
import {
  MdDataTable,
  MdDataTableHeaderSelectableRow,
  MdDataTableSelectableRow
} from "./components/data_table/data_table";
import {MdDialog} from "./components/dialog/dialog";
import {MdDivider} from "./components/divider/divider";
import {MdIcon} from "./components/icon/icon";
import {MdInk} from "./components/ink/ink";
import {
  MdPatternValidator,
  MdMaxLengthValidator,
  MdMinValueValidator,
  MdMaxValueValidator,
  MdNumberRequiredValidator,
  INPUT_VALIDATORS
} from "./components/form/validators";
import {MdMessage, MdMessages} from "./components/form/messages";
import {MdList, MdListItem} from "./components/list/list";
import {MdPeekaboo} from "./components/peekaboo/peekaboo";
import {MdSwitch} from "./components/switcher/switch";
import {MdSubheader} from "./components/subheader/subheader";
import {MdSidenav, MdSidenavContainer} from "./components/sidenav/sidenav";
import {SidenavService} from "./components/sidenav/sidenav_service";
import {MdTabs, MdTab} from "./components/tabs/tabs";
import {Media} from "./core/util/media";
import {ViewportHelper, BrowserViewportHelper, NodeViewportHelper} from "./core/util/viewport";
export * from './components/button/button';

export * from './components/content/content';

export * from './components/data_table/data_table';

export * from './components/dialog/dialog';
export * from './components/divider/divider';

export * from './components/icon/icon';

export * from './components/ink/ink';

export * from './components/form/validators';
export * from './components/form/messages';

export * from './components/list/list';

export * from './components/peekaboo/peekaboo';

export * from './components/switcher/switch';

export * from './components/subheader/subheader';

export * from './components/sidenav/sidenav';
export * from './components/sidenav/sidenav_service';

export * from './components/tabs/tabs';

export * from './core/util/media';

export * from './core/util/viewport';
export * from './core/util/animate';

/**
 * Collection of Material Design component directives.
 */
export const MATERIAL_DIRECTIVES: any[] = [
  MdAnchor, MdButton,
  MdContent,
  MdDataTable, MdDataTableHeaderSelectableRow, MdDataTableSelectableRow,
  MdDivider,
  MdIcon,
  MdInk,
  MdPatternValidator, MdMaxLengthValidator,
  MdMinValueValidator, MdMaxValueValidator,
  MdNumberRequiredValidator,
  MdMessage, MdMessages,
  MdList, MdListItem,
  MdPeekaboo,
  MdSidenav, MdSidenavContainer,
  MdSubheader,
  MdSwitch,
  MdTab, MdTabs
];

/**
 * Material Design component providers for use in a Node.JS environment.
 */
export const MATERIAL_NODE_PROVIDERS: any[] = [
  provide(ViewportHelper, {useClass: NodeViewportHelper}),
  MdDialog,
  Media,
  SidenavService,
  ...INPUT_VALIDATORS
];

/**
 * Material Design component providers for use in the browser.
 */
export const MATERIAL_BROWSER_PROVIDERS: any[] = [
  ...MATERIAL_NODE_PROVIDERS,
  provide(ViewportHelper, {useClass: BrowserViewportHelper})
];


/**
 * Please use {@see MATERIAL_NODE_PROVIDERS} or {@see MATERIAL_BROWSER_PROVIDERS}
 * as appropriate.
 *
 * @deprecated
 */
export const MATERIAL_PROVIDERS = MATERIAL_BROWSER_PROVIDERS;
