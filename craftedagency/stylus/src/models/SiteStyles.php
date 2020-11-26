<?php
/**
 * Craft CMS 3.x Plugin
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      https://craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

namespace craftedagency\stylus\models;

use craft\base\Model;

class SiteStyles extends Model
{

    // DB Properties
    // =========================================================================

    public $id;

    public $baseFontSize;

    public $h1Tag;
    public $h2Tag;
    public $h3Tag;
    public $h4Tag;
    public $h5Tag;
    public $h6Tag;
    public $pTag;

    public $sampleHeader;
    public $sampleParagraph;

    // UX Properties
    // =========================================================================

    public $h1Styles;
    public $h2Styles;
    public $h3Styles;
    public $h4Styles;
    public $h5Styles;
    public $h6Styles;
    public $pStyles;

    // public $h1FontSize;
    // public $h1FontWeight;
    // public $h1LineHeight;
    // public $h1LetterSpacing;

    // public $h3FontSize;
    // public $h3FontWeight;
    // public $h3LineHeight;
    // public $h3LetterSpacing;

    // public $pFontSize;
    // public $pFontWeight;
    // public $pLineHeight;
    // public $pLetterSpacing;

    // Constructor
    // =========================================================================

    public function __construct($obj = null, $config = [])
    {
        if($obj == null)
        {
            $this->baseFontSize = 16;
            $this->sampleHeader = 'Style Editor Sample Header';
            $this->sampleParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
            $this->h1Tag = '{"font-size":"2rem","line-height":"normal","font-weight":"700","letter-spacing":"normal"}';
            $this->h2Tag = '{"font-size":"1.5rem","line-height":"normal","font-weight":"700","letter-spacing":"normal"}';
            $this->h3Tag = '{"font-size":"1.117rem","line-height":"normal","font-weight":"700","letter-spacing":"normal"}';
            $this->h4Tag = '{"font-size":"1rem","line-height":"normal","font-weight":"700","letter-spacing":"normal"}';
            $this->h5Tag = '{"font-size":".83rem","line-height":"normal","font-weight":"700","letter-spacing":"normal"}';
            $this->h6Tag = '{"font-size":".67rem","line-height":"normal","font-weight":"700","letter-spacing":"normal"}';
            $this->pTag = '{"font-size":"1rem","line-height":"normal","font-weight":"400","letter-spacing":"normal"}';
        }
        else
        {
            $this->id = $obj->id;
            $this->baseFontSize = $obj->baseFontSize;
            $this->sampleHeader = $obj->sampleHeader;
            $this->sampleParagraph = $obj->sampleParagraph;
            $this->h1Tag = $obj->h1Tag;
            $this->h2Tag = $obj->h2Tag;
            $this->h3Tag = $obj->h3Tag;
            $this->h4Tag = $obj->h4Tag;
            $this->h5Tag = $obj->h5Tag;
            $this->h6Tag = $obj->h6Tag;
            $this->pTag = $obj->pTag;
        }

        parent::__construct($config);
    }


    // Methods
    // =========================================================================

    // protected function defineRules(): array
    // {
    //     $rules = parent::defineRules();

    //     $rules[] = [
    //         ['title'],
    //         'required',
    //     ];

    //     $rules[] = [
    //         ['title'],
    //         'string',
    //     ];

    //     $rules[] = [
    //         ['enabled', 'deleted'],
    //         'boolean',
    //     ];

    //     return $rules;
    // }
}
