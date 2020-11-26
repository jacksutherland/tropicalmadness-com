<?php

namespace craftedagency\stylus\migrations;

use craft\db\Migration;
use craftedagency\stylus\records\SiteStylesRecord;
use craftedagency\stylus\Stylus;

class Install extends Migration
{
	public function safeUp ()
	{
		$this->createTable(
			SiteStylesRecord::$tableName,
			[
				'id' => $this->primaryKey(),
				'siteId' => $this->integer()->notNull(),
				'baseFontSize' => $this->integer()->notNull(),
				'sampleHeader' => $this->string()->notNull(),
				'sampleParagraph' => $this->text()->notNull(),
				'h1Tag' => $this->string()->notNull(),
				'h2Tag' => $this->string()->notNull(),
				'h3Tag' => $this->string()->notNull(),
				'h4Tag' => $this->string()->notNull(),
				'h5Tag' => $this->string()->notNull(),
				'h6Tag' => $this->string()->notNull(),
				'pTag' => $this->string()->notNull(),
				'dateCreated' => $this->dateTime()->notNull(),
				'dateUpdated' => $this->dateTime()->notNull(),
				'uid'         => $this->uid()->notNull(),
			]
		);

	}

	public function safeDown ()
	{
		$this->dropTableIfExists(SiteStylesRecord::$tableName);
	}

}