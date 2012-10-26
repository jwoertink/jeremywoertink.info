Jeremywoertink::Application.routes.draw do
  root :to => 'site#index'
  get '/resume' => 'site#resume'
  
  controller :waves, :path => 'waves' do
    get '/', :to => :index, :as => :waves
  end
end
