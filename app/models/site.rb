class Site < ActiveRecord::Base

  validates_presence_of :name
  validates_length_of :name, :minimum => 5
  validates :name, :format => { :with => /\A[a-zA-Z]+\z/,
                                       :message => "Only letters allowed" }

end
