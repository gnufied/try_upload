class UploadsController < ApplicationController
  def index
  end

  def create
    file_data = params[:files].first
    @asset = Article.new(:stuff => file_data)
    if @asset.save
      render(:json => [{
        :thumbnail_url => url_for(@asset.stuff.url(:thumb)) ,
        :name => @asset.stuff.filename,
        :size => @asset.stuff.size,
        :url => @asset.stuff.url,
        :asset_id => @asset.id
      }])

    else
      render :json => { :result => 'error'}, :content_type => 'text/html'
    end
  end
end
