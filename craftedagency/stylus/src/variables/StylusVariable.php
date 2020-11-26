<?php
/**
 * Stylus plugin for Craft CMS 3.x
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace craftedagency\stylus\variables;

use Composer\Package\Loader\ValidatingArrayLoader;
use CraftedAgency\Stylus\Stylus;
use Craft;

/**
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class StylusVariable
{
    protected $settings;

    function __construct()
    {
        $this->settings = Stylus::$plugin->getSettings();
    }

    public function getSiteStyles()
    {
        return Stylus::$plugin->stylusService->getUXSiteStyles();
    }
}
