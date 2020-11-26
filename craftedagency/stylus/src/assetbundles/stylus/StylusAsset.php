<?php
/**
 * Craft CMS 3.x Plugin
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace CraftedAgency\Stylus\assetbundles\stylus;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class StylusAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = "@craftedagency/stylus/assetbundles/stylus/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/stylus.js',
        ];

        $this->css = [
            'css/stylus.css',
        ];

        parent::init();
    }
}
