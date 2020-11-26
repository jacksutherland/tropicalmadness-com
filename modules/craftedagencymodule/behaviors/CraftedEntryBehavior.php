<?php

// namespace craftedagency;
namespace modules\craftedagencymodule\behaviors;

use modules\craftedagencymodule\CraftedAgencyModule;

use Craft;
use yii\base\Behavior;

// These should only apply to objects of type entry
class CraftedEntryBehavior extends Behavior
{
    public function friendlyTitle()
    {
        $friendlyTitle = $this->owner->title;

        if(isset($this->owner->displayTitle) && strlen(trim($this->owner->displayTitle)) > 0)
        {
            $friendlyTitle = $this->owner->displayTitle;
        }

        return $friendlyTitle;
    }
}