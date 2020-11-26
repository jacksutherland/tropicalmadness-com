<?php
/**
 * Stylus plugin for Craft CMS 3.x
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace CraftedAgency\Stylus\assetbundles\indexcpsection;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class IndexCPSectionAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = "@craftedagency/stylus/assetbundles/indexcpsection/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/Index.js',
        ];

        $this->css = [
            'css/Index.css',
        ];

        parent::init();
    }
}
