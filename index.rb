class JeremyWoertink < Sinatra::Base
  register Sinatra::Contrib
  
  configure do
    set :root, File.dirname(__FILE__)
    set :views, Proc.new { File.join(root, 'views') }
    set :public_folder, Proc.new { File.join(root, 'public') }
  end
  
  helpers do
    def protected!
      unless authorized?
        response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
        throw(:halt, [401, "Not authorized\n"])
      end
    end

    def authorized?
      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == ['jwadmin', 'thisisareallydumbpassword']
    end
  end
  
  get '/' do
    @player = Player.new("Jeremy Woertink", "1982/01/21")
    erb :index
  end
  
  get '/resume' do
    erb :resume
  end
  
  get '/admin' do
    protected!
    @images = Dir.glob(File.join(File.dirname(__FILE__), 'public', 'images', 'tiles', '*.png')).collect { |img| img[img.rindex('/images')..-1] }
    erb :admin
  end
  
  get '/javascripts/application.js' do
    coffee :application
  end
end