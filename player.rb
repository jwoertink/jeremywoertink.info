require 'date'
class Player
  attr_accessor :name, :birthday
  
  def initialize(name, birthday)
    @name = name
    @birthday = birthday
  end
  
  def age
    Date.today.year - Date.parse(@birthday).year
  end
  
end