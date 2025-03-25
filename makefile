release-version:
	(node_modules/.bin/standard-version)
	git push --follow-tags origin main

increase-major-version :
	npm run release -- --release-as major
	git push --follow-tags origin 

increase-minor-version :
	npm run release -- --release-as minor
	git push --follow-tags origin 

increase-patch-version :
	npm run release -- --release-as patch
	git push --follow-tags origin 