import {addFilter} from '@wordpress/hooks';
import {createHigherOrderComponent} from '@wordpress/compose';
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, RangeControl, __experimentalUnitControl as UnitControl} from '@wordpress/components';

import {BlockControls} from '@wordpress/block-editor';
import {Toolbar, ToolbarGroup, ToolbarButton} from '@wordpress/components';

import {grid} from '@wordpress/icons';

import './index.scss';

// Adding wrapper div in backend
// const withWrapperForMegaMenu = createHigherOrderComponent( ( BlockEdit ) => {
//     return ( props ) => {
//         if (props.name !== "core/navigation-submenu") {
//             return <BlockEdit { ...props } />;
//         }
//
//         return (
//             <>
//                 <div className="mega-menu-wrapper">
//                     <BlockEdit { ...props } />
//                 </div>
//             </>
//         );
//     };
// }, "withWrapperForMegaMenu" );
//
// addFilter(
//     'editor.BlockEdit',
//     'extend-nav-block/edit',
//     withWrapperForMegaMenu
// );


// Adding wrapper div in saved (after reloading saved block)
// function wrapSubNavigationBlockInContainer( element, blockType, attributes ) {
//     if ( ! element ) {
//         return;
//     }
//
//     if ( blockType.name !== 'core/navigation-submenu' ) {
//         return element;
//     }
//
//     // return the element wrapped in a div
//     return <div className="mega-menu-wrapper">{ element }</div>;
// }
//
// wp.hooks.addFilter(
//     'blocks.getSaveElement',
//     'extend-nav-block/wrap-sub-navigation-in-container',
//     wrapSubNavigationBlockInContainer
// );

// Add Sub Nav Attribute
const addSubNavAttribute = (settings, name) => {
    if (name !== 'core/navigation-submenu') {
        return settings;
    }

    if (typeof settings.attributes !== 'undefined') {
        settings.attributes = Object.assign(settings.attributes, {
            enableMegaMenu: {
                type: 'boolean',
                default: false,
            }
        });
    }

    return settings;
}

wp.hooks.addFilter(
    'blocks.registerBlockType',
    'extend-nav-block/sub-nav-custom-attribute',
    addSubNavAttribute
);

// Adding mega menu blockcontrol
const addSubNavMegaMenuOption = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== "core/navigation-submenu") {
            return <BlockEdit {...props} />;
        }

        const {attributes, setAttributes} = props;

        const toggleMegaMenu = () => {
            setAttributes({enableMegaMenu: !attributes.enableMegaMenu})
        }

        return (
            <>
                <BlockEdit {...props} />

                <BlockControls group="block">
                    <ToolbarButton
                        icon={grid}
                        label="Mega Menu"
                        onClick={toggleMegaMenu}
                    />
                </BlockControls>
            </>
        );
    };
}, "addSubNavMegaMenuOption");

addFilter(
    'editor.BlockEdit',
    'extend-nav-block/edit',
    addSubNavMegaMenuOption
);