<?php
/**
 * Craft CMS 3.x Plugin
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace CraftedAgency\Stylus\assetbundles\site;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class CraftedSiteAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = "@craftedagency/stylus/assetbundles/site/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/site.js',
        ];

        // $this->css = [
        //     'css/site.css',
        // ];

        parent::init();
    }
}
