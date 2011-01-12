require 'rubygems'
require 'sinatra'

get '/' do
  erb :index
end

get '/resume' do
  erb :resume
end