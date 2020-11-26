<?php
/**
 * Stylus plugin for Craft CMS 3.x
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace craftedagency\stylus;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fields;
use craft\web\twig\variables\CraftVariable;
//use craftedagency\stylus\fieldtypes\StylusField as StylusFieldAlias;
use craftedagency\stylus\models\Settings;
use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;

use craftedagency\stylus\services\StylusService;
use craftedagency\stylus\variables\StylusVariable;
use yii\base\Event;

//use StylusField;

/**
 * Class Stylus
 *
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class Stylus extends Plugin
{

    // Static Properties
    // =========================================================================

    public static $plugin;


    // Public Properties
    // =========================================================================

    //public $defaultUrl = 'stylus';

    public $schemaVersion = '1.0.0';

    public $hasCpSettings = true;

    public $hasCpSection = true;


    // Public Methods
    // =========================================================================

    public function init()
    {
        parent::init();
        self::$plugin = $this;

        $this->initZoom();

        Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function(Event $e)
        {
            $variable = $e->sender;
            $variable -> set('stylus', StylusVariable::class);
        });

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event)
            {
                $event->rules['stylus'] = 'stylus/stylus/index';
            }
        );

        // Event::on(
        //     Plugins::class,
        //     Plugins::EVENT_AFTER_INSTALL_PLUGIN,
        //     function (PluginEvent $event)
        //     {
        //         if ($event->plugin === $this)
        //         {
        //         }
        //     }
        // );

        $this->setComponents([
            'stylusService' => StylusService::class
        ]);

        Craft::info(
            Craft::t(
                'stylus',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    // public function getCpNavItem()
    // {
    //     $item = parent::getCpNavItem();
    //     $item['label'] = 'Stylus';
    //     $item['url'] = 'stylus';
    //     $item['subnav'] = [
    //             'meetings' => ['label' => 'Zoom Meetings', 'url' => 'stylus/zoom/meetings'],
    //             'user' => ['label' => 'Zoom Users', 'url' => 'stylus/zoom/users'],
    //     ];
    //     return $item;
    // }


    // Private Methods
    // =========================================================================

    public function initZoom()
    {
        // Event::on(
        //     UrlManager::class,
        //     UrlManager::EVENT_REGISTER_SITE_URL_RULES,
        //     function (RegisterUrlRulesEvent $event)
        //     {
        //         //$event->rules['zoommeeting'] = 'stylus/zoom-meeting/meet';
        //         $event->rules['stylus/zoom/join-embedded-meeting'] = 'stylus/zoom-meeting/join-embedded-meeting';
        //     }
        // );

        // $this->setComponents([
        //     'zoomService' => ZoomService::class,
        //     'zoomUserService' => ZoomUserService::class,
        //     'zoomMeetingService' => ZoomMeetingService::class,
        // ]);

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event)
            {
                //$event->rules['stylus'] = 'stylus/index';
                // $event->rules['stylus/zoom/meeting'] = 'stylus/zoom-meeting/index';
                // $event->rules['stylus/zoom/create'] = 'stylus/zoom-meeting/create-meeting';
                // $event->rules['stylus/zoom/instant'] = 'stylus/zoom-meeting/instant-meeting';
                // $event->rules['stylus/zoom/webinar'] = 'stylus/zoom-webinar/index';
                // $event->rules['stylus/zoom/deletemeeting'] = 'stylus/zoom-meeting/delete-meeting';
                // $event->rules['stylus/zoom/update/<id:\d+>']='stylus/zoom-meeting/update-meeting';
                // $event->rules['stylus/zoom/users']='stylus/zoom-user/index';
                // $event->rules['stylus/zoom/users/add']='stylus/zoom-user/add-user';
                // $event->rules['stylus/zoom/users/saveuser']='stylus/zoom-user/save-user';
                // $event->rules['stylus/zoom/users/update']='stylus/zoom-user/update-user';
                // $event->rules['stylus/zoom/users/delete']='stylus/zoom-user/delete-user';
                // $event->rules['stylus/zoom/new-embedded-meeting'] = 'stylus/zoom-meeting/start-embedded-meeting';
            }
        );

        // Event::on(Fields::class,Fields::EVENT_REGISTER_FIELD_TYPES,function(RegisterComponentTypesEvent $event){

        //         $event->types[]= ZoomFieldAlias::class;
        //         $event->types[]= ZoomPresentationFieldAlias::class;

        // });
    }


    // Protected Methods
    // =========================================================================

    protected function createSettingsModel()
    {
        return new Settings();
    }

    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate(
            'stylus/settings',
            [
                'settings' => $this->getSettings()
            ]
        );
    }

    
}
