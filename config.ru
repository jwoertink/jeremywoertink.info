require 'rubygems'
require 'bundler'

Bundler.require
require 'sinatra'
require "sinatra/reloader" if development?
require 'barista'

LOCAL_ROOT = File.dirname(__FILE__)
require File.join(LOCAL_ROOT, 'player')
require File.join(LOCAL_ROOT, 'index')
run JeremyWoertink
