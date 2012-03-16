class JeremyWoertink < Sinatra::Base
  register Barista::Integration::Sinatra
  configure do
    set :root, File.dirname(__FILE__)
    set :views, Proc.new { File.join(root, 'views') }
    set :public, Proc.new { File.join(root, 'public') }
  end
  
  get '/' do
    @player = Player.new("Jeremy Woertink", "1982/01/21")
    erb :index
  end
  
  get '/coffee' do
    erb :coffee
  end
  
  get '/resume' do
    erb :resume
  end
end