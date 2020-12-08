<?php

$vendorDir = dirname(__DIR__);
$rootDir = dirname(dirname(__DIR__));

return array (
  'flipboxfactory/craft-link' => 
  array (
    'class' => 'flipbox\\craft\\link\\Link',
    'basePath' => $vendorDir . '/flipboxfactory/craft-link/src',
    'handle' => 'link',
    'aliases' => 
    array (
      '@flipbox/craft/link' => $vendorDir . '/flipboxfactory/craft-link/src',
    ),
    'name' => 'Link',
    'version' => '1.1.4',
    'schemaVersion' => '2.0.0',
    'description' => 'Link Field Type for Craft CMS',
    'developer' => 'Flipbox Digital',
    'developerUrl' => 'https://www.flipboxdigital.com',
    'documentationUrl' => 'https://github.com/flipboxfactory/craft-link/blob/master/README.md',
    'changelogUrl' => 'https://raw.githubusercontent.com/flipboxfactory/craft-link/master/CHANGELOG.md',
    'hasCpSettings' => false,
    'hasCpSection' => false,
  ),
  'craftcms/rackspace' => 
  array (
    'class' => 'craft\\rackspace\\Plugin',
    'basePath' => $vendorDir . '/craftcms/rackspace/src',
    'handle' => 'rackspace',
    'aliases' => 
    array (
      '@craft/rackspace' => $vendorDir . '/craftcms/rackspace/src',
    ),
    'name' => 'Rackspace Cloud Files',
    'version' => '1.1.0',
    'description' => 'Rackspace Cloud Files integration for Craft CMS',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'changelogUrl' => 'https://raw.githubusercontent.com/craftcms/rackspace/master/CHANGELOG.md',
    'downloadUrl' => 'https://github.com/craftcms/rackspace/archive/master.zip',
  ),
  'lukeyouell/craft-sentry' => 
  array (
    'class' => 'lukeyouell\\sentry\\Sentry',
    'basePath' => $vendorDir . '/lukeyouell/craft-sentry/src',
    'handle' => 'sentry',
    'aliases' => 
    array (
      '@lukeyouell/sentry' => $vendorDir . '/lukeyouell/craft-sentry/src',
    ),
    'name' => 'Sentry',
    'version' => '1.5.1',
    'schemaVersion' => '1.0.0',
    'description' => 'Error tracking that helps developers monitor and fix crashes in real time. Iterate continuously. Boost efficiency. Improve user experience.',
    'developer' => 'Luke Youell',
    'developerUrl' => 'https://github.com/lukeyouell',
    'changelogUrl' => 'https://raw.githubusercontent.com/lukeyouell/craft-sentry/master/CHANGELOG.md',
    'hasCpSettings' => true,
    'hasCpSection' => false,
  ),
  'nfourtythree/entriessubset' => 
  array (
    'class' => 'nfourtythree\\entriessubset\\EntriesSubset',
    'basePath' => $vendorDir . '/nfourtythree/entriessubset/src',
    'handle' => 'entriessubset',
    'aliases' => 
    array (
      '@nfourtythree/entriessubset' => $vendorDir . '/nfourtythree/entriessubset/src',
    ),
    'name' => 'Entries Subset',
    'version' => '1.2.3',
    'schemaVersion' => '1.1.1',
    'description' => 'Craft field type plugin that extends the core Entries field type to give extra settings with ability to restrict by entry type',
    'developer' => 'Nathaniel Hammond (nfourtythree)',
    'developerUrl' => 'http://n43.me',
    'documentationUrl' => 'https://github.com/nfourtythree/craft3-entriessubset/blob/master/README.md',
    'changelogUrl' => 'https://raw.githubusercontent.com/nfourtythree/craft3-entriessubset/master/CHANGELOG.md',
    'hasCpSettings' => false,
    'hasCpSection' => false,
  ),
  'craftedagency/stylus' => 
  array (
    'class' => 'craftedagency\\stylus\\Stylus',
    'basePath' => '../craftedagency/stylus/src',
    'handle' => 'stylus',
    'aliases' => 
    array (
      '@craftedagency/stylus' => $vendorDir . '/craftedagency/stylus/src',
    ),
    'name' => 'Style Editor',
    'version' => '1.0.0',
    'description' => 'Crafted Agency\'s plugin for base website design properties.',
    'developer' => 'Crafted Agency',
    'developerUrl' => 'https://craftedagency.com',
    'documentationUrl' => 'https://craftedagency.com/services/website-development',
    'changelogUrl' => 'https://craftedagency.com/services/website-development',
    'components' => 
    array (
      'zoomMeetingService' => 'craftedagency\\stylus\\services\\StylusService',
    ),
  ),
  'craftcms/redactor' => 
  array (
    'class' => 'craft\\redactor\\Plugin',
    'basePath' => $vendorDir . '/craftcms/redactor/src',
    'handle' => 'redactor',
    'aliases' => 
    array (
      '@craft/redactor' => $vendorDir . '/craftcms/redactor/src',
    ),
    'name' => 'Redactor',
    'version' => '2.8.4',
    'description' => 'Edit rich text content in Craft CMS using Redactor by Imperavi.',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'developerEmail' => 'support@craftcms.com',
    'documentationUrl' => 'https://github.com/craftcms/redactor/blob/v2/README.md',
  ),
  'ether/seo' => 
  array (
    'class' => 'ether\\seo\\Seo',
    'basePath' => $vendorDir . '/ether/seo/src',
    'handle' => 'seo',
    'aliases' => 
    array (
      '@ether/seo' => $vendorDir . '/ether/seo/src',
    ),
    'name' => 'SEO',
    'version' => '3.6.7',
    'description' => 'SEO utilities including a unique field type, sitemap, & redirect manager',
    'developer' => 'Ether Creative',
    'developerUrl' => 'https://ethercreative.co.uk',
    'documentationUrl' => 'https://github.com/ethercreative/seo/blob/v3/README.md',
  ),
  'verbb/super-table' => 
  array (
    'class' => 'verbb\\supertable\\SuperTable',
    'basePath' => $vendorDir . '/verbb/super-table/src',
    'handle' => 'super-table',
    'aliases' => 
    array (
      '@verbb/supertable' => $vendorDir . '/verbb/super-table/src',
    ),
    'name' => 'Super Table',
    'version' => '2.6.4',
    'description' => 'Super-charge your Craft workflow with Super Table. Use it to group fields together or build complex Matrix-in-Matrix solutions.',
    'developer' => 'Verbb',
    'developerUrl' => 'https://verbb.io',
    'developerEmail' => 'support@verbb.io',
    'documentationUrl' => 'https://github.com/verbb/super-table',
    'changelogUrl' => 'https://raw.githubusercontent.com/verbb/super-table/craft-3/CHANGELOG.md',
  ),
);
