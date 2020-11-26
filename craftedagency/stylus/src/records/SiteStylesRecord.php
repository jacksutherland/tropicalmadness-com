<?php
/**
 * Craft CMS 3.x Plugin
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace craftedagency\stylus\records;

use craft\db\ActiveRecord;

/**
 * Class SiteStylesRecord
 *
 * @package craftedagency\stylus\records
 */
class SiteStylesRecord extends ActiveRecord
{
    public static $tableName = '{{%craftedagency_sitestyles}}';

    public static function tableName ()
    {
        return self::$tableName;
    }
}