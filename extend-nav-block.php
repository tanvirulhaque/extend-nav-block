<?php
/*
Plugin Name:    Extend Nav Block
Description:    A sample plugin on how to extend existing Gutenberg navigation block
Plugin URI:
Author:
Author URI:
Version:        1.0.0
Text Domain:    extend-nav-block
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', function () {
	$config = require_once plugin_dir_path( __FILE__ ) . '/build/index.asset.php';

	wp_enqueue_style(
		'extend-nav-block-style',
		plugin_dir_url( __FILE__ ) . '/build/index.css',
		array(),
		$config['version']
	);

	wp_enqueue_script(
		'extend-nav-block-script',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$config['dependencies'],
		$config['version']
	);
} );