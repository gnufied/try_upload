class Article < ActiveRecord::Base
  mount_uploader :stuff, StuffUploader
end
