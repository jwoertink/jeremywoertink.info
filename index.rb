require 'sinatra'
LOCAL_PATH = File.dirname(__FILE__);
set :views, LOCAL_PATH + '/views'
set :public, LOCAL_PATH + '/public'


get '/' do
  erb :index
end

get '/resume' do
  erb :resume
end