<?php
/**
 * CraftedAgency module for Craft CMS 3.x
 *
 * Various operations for Crafted Agency websites
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace modules\craftedagencymodule;

use modules\craftedagencymodule\behaviors\CraftedEntryBehavior;

use Craft;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\TemplateEvent;
use craft\i18n\PhpMessageSource;
use craft\web\View;
use craft\services\Elements;
use craft\events\RegisterComponentTypesEvent;

use craft\elements\db\ElementQuery;
use craft\events\PopulateElementEvent;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;


class CraftedAgencyModule extends Module
{
    // Static Properties
    // =========================================================================

    public static $instance;

    // Public Methods
    // =========================================================================

    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/craftedagencymodule', $this->getBasePath());
        $this->controllerNamespace = 'modules\craftedagencymodule\controllers';

        // Translation category
        $i18n = Craft::$app->getI18n();
        /** @noinspection UnSafeIsSetOverArrayInspection */
        if (!isset($i18n->translations[$id]) && !isset($i18n->translations[$id.'*'])) {
            $i18n->translations[$id] = [
                'class' => PhpMessageSource::class,
                'sourceLanguage' => 'en-US',
                'basePath' => '@modules/craftedagencymodule/translations',
                'forceTranslation' => true,
                'allowOverrides' => true,
            ];
        }

        // Set this as the global instance of this module class
        static::setInstance($this);

        parent::__construct($id, $parent, $config);
    }

    public function init()
    {
        parent::init();
        self::$instance = $this;

        // // Craft Template Hook
        // Craft::$app->view->hook('foo', function(array &$context)
        // {
        //     $context['foo'] = 'bar';
        //     return 'bar'
        // });

        Event::on(ElementQuery::class, ElementQuery::EVENT_AFTER_POPULATE_ELEMENT, function(PopulateElementEvent $event)
        {
            $element = $event->element;
            
            if (get_class($element) == 'craft\elements\Entry')
            {
                $element->attachBehavior('myCraftedAgencyEntryBehavior', CraftedEntryBehavior::className());
            }
        });

        Craft::info(
            Craft::t(
                'crafted-agency-module',
                '{name} module loaded',
                ['name' => 'CraftedAgency']
            ),
            __METHOD__
        );
    }

}
