<?php
/**
 * Stylus plugin for Craft CMS 3.x
 *
 * Crafted Agency's plugin for virtual presentations, live video, file sharing and zoom integration.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

// namespace craftedagency\stylus\fieldtypes;

// use craft\base\ElementInterface;
// use craft\base\Field;
// use craft\base\PreviewableFieldInterface;
// use Craft;
// use CraftedAgency\Stylus\Stylus;

// /**
//  * @author    Crafted Agency
//  * @package   Stylus
//  * @since     1.0.0
//  */
// class ZoomPresentationField extends Field implements PreviewableFieldInterface
// {
//     public static function displayName(): string
//     {

//         return Craft::t('app','Zoom Presentation');
//     }

//     public function normalizeValue($value, ElementInterface $element = null)
//     {
//         if(is_array($value))
//         {
//             return $value;
//         }
//         $obj = json_decode($value);
//         if($obj == null)
//         {
//             //return (object)array('topic' => '', 'meetingid' => '');
//             return (object)array('topic' => '');
//         }
//         return $obj;
//     }

//     public  function getInputHtml($value, ElementInterface $element = null): string
//     {

//         $meetingId = '';
//         $sessionKey = "host-" . Craft::$app->getUser()->getId() . "-instant-meeting";

//         if(Craft::$app->getSession()->has($sessionKey))
//         {
//             $obj = unserialize(Craft::$app->getSession()->get($sessionKey));
//             $meetingDetails = Stylus::$plugin->zoomMeetingService->getMeetingDetails($obj->meetingId);
//             if($meetingDetails != null && $meetingDetails->status != "finished")
//             {
//                 $meetingId = $meetingDetails->id;
//             }
//         }

//         return Craft::$app->getView()->renderTemplate('stylus/zoom/meetings/_presentation', [
//             'topic' => $value->topic,
//             'meetingid' => $meetingId,
//             'field' => $this,
//         ]);


//     }
// }
