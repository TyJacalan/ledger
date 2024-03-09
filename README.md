# Ledger

A full stack task manager application built with Ruby on Rails.

<img width="1439" alt="Screenshot 2024-03-09 at 11 19 20 AM" src="https://github.com/TyJacalan/ledger/assets/143598524/3382e13f-b1e1-404d-a054-9f1257b386fe">

## Features

* User is able to create a category that can be used to organize tasks
* User is able to edit a category to update the category's details
* User is able to view a category to show the category's details
* User is able to create a task for a specific category
* User is able to edit a task to update task's details
* User is able to view a task to show task's details
* User is able to delete a task
* User is able to create an account
* User is able to login and access account and link own tasks

## Main dependencies

* Ruby 3.3.0
* Rails 7.1.3.2
* Postgres 16.2
* Devise 4.9.2
* Shadcn-ui 0.0.12

## Getting Started

1. Clone the respository
```
git clone https://github.com/TyJacalan/ledger.git
```
3. Go to the project directory and install dependencies
```
cd ledger
bundle install
```
3. Create new credentials
```
EDITOR="code --wait" rails credentials:edit
```
4. Run the development
```
bin/rails db:create db:migrate
bin/rails s
```
