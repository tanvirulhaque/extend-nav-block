import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

const withWrapperForMegaMenu = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        if (props.name !== "core/navigation-submenu") {
            return <BlockEdit { ...props } />;
        }

        return (
            <>
                <div className="mega-menu-wrapper">
                    <BlockEdit { ...props } />
                </div>
            </>
        );
    };
}, "withWrapperForMegaMenu" );

addFilter(
    'editor.BlockEdit',
    'extend-nav-block/edit',
    withWrapperForMegaMenu
);