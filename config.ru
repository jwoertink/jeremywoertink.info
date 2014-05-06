require 'rubygems'
require 'sinatra'
$: << File.dirname(__FILE__)
require 'app'

run Sinatra::Application