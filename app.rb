require 'sinatra'
require 'slim'

set :slim, pretty: true

get '/' do
  slim :index
end

get '/resume' do
  slim :resume
end

get '/waves' do
  slim :waves
end