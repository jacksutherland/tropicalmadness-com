<?php
/**
 * Stylus plugin for Craft CMS 3.x
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace craftedagency\stylus\controllers;

use craft\helpers\DateTimeHelper;
use craft\web\Controller;
use Craft;
use craft\web\View;
use CraftedAgency\Stylus\Stylus;

/**
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class StylusController extends Controller
{

    public function init()
    {
        parent::init();
    }

    public function actionIndex ()
	{
		$siteStyles = Stylus::$plugin->stylusService->getSiteStyles();

        return $this->renderTemplate('stylus/index', [
            'siteStyles' => $siteStyles
        ]);
	}

	public function actionSaveSiteStyles()
    {
        $request = Craft::$app->getRequest();

        return Stylus::$plugin->stylusService->saveStylusRequest($request);
    }
}
