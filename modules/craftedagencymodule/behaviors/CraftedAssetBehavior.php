<?php

namespace modules\craftedagencymodule\behaviors;

use modules\craftedagencymodule\CraftedAgencyModule;

use Craft;
use yii\base\Behavior;

// These should only apply to objects of type entry
class CraftedAssetBehavior extends Behavior
{
	private function isMobileDevice()
	{ 
    	return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]); 
	}

	public function responsiveVideoUrl($mobileUrl = null)
	{
		$videoUrl = $this->owner->getUrl();

		if($mobileUrl != null && $this->isMobileDevice())
		{
			$videoUrl = $mobileUrl;
		}

		return $videoUrl;
	}

    public function optimizedUrl($transformName = null, $webpCompression = null)
    {
    	// Get global field values

    	$assetsGlobals = Craft::$app->globals->getSetByHandle('assets');
    	$enableWebp = $assetsGlobals != null && $assetsGlobals->enableWebp != null && $assetsGlobals->enableWebp;

    	// Get original image url

    	if($transformName != null)
    	{
    		$this->owner->setTransform($transformName);
    	}

    	$originUrl = $this->owner->getUrl();
    	$returnUrl = $originUrl;

    	// Check if webp global is enabled & if browser supports webp

    	if($enableWebp && strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) == true)
    	{
	    	// Get new and old filenames & file extension.

	    	$ext = strtolower($this->owner->getExtension()); // file extension
	    	$filename = $this->owner->getFilename(false); // without ext
	    	$originFilename = $this->owner->getFilename(true); // with ext
	    	$optimizedFilename = $filename . ".webp"; // webp filename

	    	// Get file paths and urls for webp file and original file

	    	$path = ltrim(str_replace($originFilename, '', parse_url($originUrl, PHP_URL_PATH)), '/');
	    	$webpUrl = str_replace($ext, 'webp', $originUrl);
	    	$webpPath = $path . $optimizedFilename;

	    	// return webp url if it already exists

	        if(file_exists($webpPath))
	        {
	        	$returnUrl = $webpUrl;
	        }
	        else if($ext == 'png' || $ext == 'jpg' || $ext == 'jpeg')
	        {
	        	// Create webp file and return its url

	        	if($webpCompression == null)
	        	{
	        		$webpCompression = ($assetsGlobals->webpCompressionFactor != null ? $assetsGlobals->webpCompressionFactor : 85);
	        	}

	        	if(is_dir($path))
	        	{
		        	chdir($path);

		        	if(strtolower($ext) == 'png')
		        	{
		        		exec("cwebp -lossless " . $originFilename . " -o " . $optimizedFilename);
		        	}
		        	else
		        	{
						exec("cwebp -q " . $webpCompression . " " . $originFilename . " -o " . $optimizedFilename);
					}

					$returnUrl = $webpUrl;
				}
			}
		}

		// Return the original file's url as last resort

        return $returnUrl;
    }
}