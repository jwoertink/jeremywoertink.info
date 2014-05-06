require 'sinatra'
Bundler.require
$: << File.dirname(__FILE__)
require 'app'

run Sinatra::Application