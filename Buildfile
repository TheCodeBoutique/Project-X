# ===========================================================================
# Project:   Asprouttrailer
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :ki, "sproutcore/ace"],  :theme => "sproutcore/ace"

#http://trailers.apple.com/trailers/home/feeds/exclusive.json

proxy '/just_added', :to =>'trailers.apple.com' , :url => '/trailers/home/feeds/just_added.json'
proxy '/most_pop', :to =>'trailers.apple.com' , :url => '/trailers/home/feeds/most_pop.json'
proxy '/search', :to => 'api.nytimes.com', :url => 'api.nytimes.com/svc/movies/v2/reviews/search'





