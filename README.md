# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

DB設計

usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
|email|string|null: false, unique: true|

Association
- has_many :messages
- has_many :groups_users
- has_many :group, through: :groups_users


groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|

Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users


messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|text|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

Association
- belongs_to :user
- belongs_to :group


groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

Association
- belongs_to :user
- belongs_to :group
