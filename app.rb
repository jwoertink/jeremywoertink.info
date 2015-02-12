require 'sinatra'
require 'slim'

set :slim, pretty: true
set :server, :puma

get '/' do
  slim :index
end

get '/resume' do
  slim :resume
end

get '/waves' do
  slim :waves
end
