class TokenController < ApplicationController
  def create
    respond_to do |format|
      format.json { render :json => {:token => form_authenticity_token.inspect} }
    end
  end
end
