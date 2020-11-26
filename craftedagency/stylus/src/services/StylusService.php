<?php
/**
 * Stylus plugin for Craft CMS 3.x
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace craftedagency\stylus\services;

use Craft;
use craft\gql\base\ObjectType;
use yii\base\Component;
use craft\helpers\DateTimeHelper;
use craft\helpers\StringHelper;
use craft\helpers\Db;

use craftedagency\stylus\Stylus;
use craftedagency\stylus\models\SiteStyles;
use craftedagency\stylus\records\SiteStylesRecord;

/**
 * @author    Crafted Agency
 * @package   Stylus
 * @since     1.0.0
 */
class StylusService extends Component
{
    const LETTERSPACINGNORMAL = -17;
    const LINEHEIGHTNORMAL = 7;

    private $model;

    public function getUXSiteStyles($getDefaults = true)
    {
        $query = SiteStylesRecord::find();

        if($query->count() == 0)
        {
            return null;
        }
        else
        {
            $this->model = new SiteStyles($query->one());

            $this->addUXTagToModel('h1');
            $this->addUXTagToModel('h2');
            $this->addUXTagToModel('h3');
            $this->addUXTagToModel('h4');
            $this->addUXTagToModel('h5');
            $this->addUXTagToModel('h6');
            $this->addUXTagToModel('p');

            $this->model->baseFontSize = $this->model->baseFontSize . 'px';

            return $this->model;
        }
    }

    public function getSiteStyles($getDefaults = true)
    {
        $query = SiteStylesRecord::find();

        $this->model = $query->count() == 0 ? new SiteStyles() : new SiteStyles($query->one());

        $this->addTagPropertiesToModel('h1');
        $this->addTagPropertiesToModel('h2');
        $this->addTagPropertiesToModel('h3');
        $this->addTagPropertiesToModel('h4');
        $this->addTagPropertiesToModel('h5');
        $this->addTagPropertiesToModel('h6');
        $this->addTagPropertiesToModel('p');

        return $this->model;
    }

    public function saveStylusRequest($req)
    {
        try
        {
            $query = SiteStylesRecord::find();
            if($query->count() == 0)
            {
                $record = new SiteStylesRecord();
                $record->uid = StringHelper::UUID();
                $record->dateCreated = Db::prepareValueForDb(new \DateTime());
            }
            else
            {
                $record = $query->one();
            }

            $this->model = Stylus::$plugin->stylusService->getSiteStyles();

            $baseFontSize = $req->getBodyParam('baseFontSize');

            $record->h1Tag = $this->getTagFromRequest('h1', $req, $baseFontSize);
            $record->h2Tag = $this->getTagFromRequest('h2', $req, $baseFontSize);
            $record->h3Tag = $this->getTagFromRequest('h3', $req, $baseFontSize);
            $record->h4Tag = $this->getTagFromRequest('h4', $req, $baseFontSize);
            $record->h5Tag = $this->getTagFromRequest('h5', $req, $baseFontSize);
            $record->h6Tag = $this->getTagFromRequest('h6', $req, $baseFontSize);
            $record->pTag = $this->getTagFromRequest('p', $req, $baseFontSize);

            $record->baseFontSize = $baseFontSize;
            $record->sampleHeader = $req->getBodyParam('sampleHeader');
            $record->sampleParagraph = $req->getBodyParam('sampleParagraph');
            $record->dateUpdated = Db::prepareValueForDb(new \DateTime());

            $record->save(false);
        }
        catch (Exception $e)
        {
            $error = $e->getMessage();

            return false;
        }
    }

    private function getTagFromRequest($tagName, $request, $baseFontSize)
    {
        $fontWeight = $request->getBodyParam($tagName . 'FontWeight');
        $fontSize = $request->getBodyParam($tagName . 'FontSize');
        $lineHeight = $request->getBodyParam($tagName . 'LineHeight');
        $letterSpacing = $request->getBodyParam($tagName . 'LetterSpacing');

        $fontSize = ($fontSize / $baseFontSize) . 'rem';
        $lineHeight = $lineHeight == self::LINEHEIGHTNORMAL ? 'normal' : ($lineHeight / $baseFontSize) . 'rem';
        $letterSpacing = $letterSpacing == self::LETTERSPACINGNORMAL ? 'normal' : ($letterSpacing / $baseFontSize) . 'rem';

        $tagObj = json_decode($this->model[$tagName . 'Tag']);
        $tagObj->{'font-weight'} = $fontWeight;
        $tagObj->{'font-size'} = $fontSize;
        $tagObj->{'line-height'} = $lineHeight;
        $tagObj->{'letter-spacing'} = $letterSpacing;
        
        return json_encode($tagObj);
    }

    private function addUXTagToModel($tagName)
    {
        $tagProp = $tagName . 'Tag';
        $stylesProp = $tagName . 'Styles';

        $tagObj = json_decode($this->model[$tagProp]);

        $stylesArray = array();

        $stylesArray['font-size'] = $tagObj->{'font-size'};
        $stylesArray['font-weight'] = $tagObj->{'font-weight'};
        $stylesArray['line-height'] = $tagObj->{'line-height'};
        $stylesArray['letter-spacing'] = $tagObj->{'letter-spacing'};

        $this->model[$stylesProp] = $stylesArray;
    }

    private function addTagPropertiesToModel($tagName)
    {
        $tagProp = $tagName . 'Tag';
        $stylesProp = $tagName . 'Styles';

        $tagObj = json_decode($this->model[$tagProp]);

        $stylesArray = array();

        $stylesArray['font-weight'] = $tagObj->{'font-weight'};

        $fontSize = str_replace('rem', '', $tagObj->{'font-size'});
        $fontSize = $fontSize * $this->model->baseFontSize;
        $stylesArray['font-size'] = $fontSize;

        if(!property_exists($tagObj, 'line-height') || $tagObj->{'line-height'} == 'normal')
        {
            $lineHeight = self::LINEHEIGHTNORMAL;
        }
        else
        {
            $lineHeight = str_replace('rem', '', $tagObj->{'line-height'});
            $lineHeight = $lineHeight * $this->model->baseFontSize;
        }
        $stylesArray['line-height'] = $lineHeight;

        if(!property_exists($tagObj, 'letter-spacing') || $tagObj->{'letter-spacing'} == 'normal')
        {
            $letterSpacing = self::LETTERSPACINGNORMAL;
        }
        else
        {
            $letterSpacing = str_replace('rem', '', $tagObj->{'letter-spacing'});
            $letterSpacing = $letterSpacing * $this->model->baseFontSize;
        }
        $stylesArray['letter-spacing'] = $letterSpacing;

        $this->model[$stylesProp] = $stylesArray;
    }
}
