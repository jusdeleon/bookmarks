var bookmarks = angular.module('Bookmarks', []);

bookmarks

	.controller('MainCtrl', function($scope) {
		$scope.categories = [
			{"id": 1, "name": "PHP"},
			{"id": 2, "name": "JavaScript"},
		];

		$scope.bookmarks = [
			{"id": 1, "title": 'Laracasts', "url": "http://laracasts.com", "category": "PHP"},
			{"id": 2, "title": 'PHP The Right Way', "url": "http://phptherightway.com", "category": "PHP"},
			{"id": 3, "title": 'PHP.net', "url": "http://php.net", "category": "PHP"},
			{"id": 4, "title": 'Egghead', "url": "http://egghead.io", "category": "JavaScript"},
			{"id": 5, "title": 'jQuery', "url": "http://jquery.com", "category": "JavaScript"},
		];

		$scope.currentCategory = null;

		function setCurrentCategory(category) {
			$scope.currentCategory = category;
			$scope.cancelCreating();
			$scope.cancelEditing();
		}

		function isCurrentCategory(category) {
			$scope.currentCategory !== null && $scope.currentCategory.name === category.name;
		}

		// Set function accessible to the view
		// Becomes "public"
		$scope.setCurrentCategory = setCurrentCategory;
		$scope.isCurrentCategory = isCurrentCategory;

		// CREATING & EDITING STATES
		$scope.isCreating = false;
		$scope.isEditing = false;

		function startCreating() {
			$scope.isCreating = true;
			$scope.isEditing = false;

			resetCreateForm();
		}

		function cancelCreating() {
			$scope.isCreating = false;
		}

		function startEditing() {
			$scope.isCreating = false;
			$scope.isEditing = true;
		}

		function cancelEditing() {
			$scope.isEditing = false;
		}

		function shouldShowCreating() {
			return $scope.currentCategory && !$scope.isEditing;
		}

		function shouldShowEditing() {
			return $scope.isEditing && ! $scope.creating;
		}

		function resetCreateForm() {
			$scope.newBookmark = {
				title: '',
				url: '',
				category: $scope.currentCategory.name
			}
		}

		// CRUD
		function createBookmark(bookmark) {
			bookmark.id = $scope.bookmarks.length;
			$scope.bookmarks.push(bookmark);

			resetCreateForm();
		}

		$scope.editedBookmark = null;

		$scope.setEditedBookmark = function (bookmark) {
			$scope.editedBookmark = angular.copy(bookmark); //prevents updating of the "bookmark" from the bookmarks list itself
		}

		$scope.setEditedBookmarkIndex = function (index) {
			$scope.editedBookmarkIndex = index;
		}

		$scope.updateBookmark = function (bookmark) {
			var index = $scope.editedBookmarkIndex;

			$scope.bookmarks[index] = bookmark;

			$scope.editedBookmark = null;
			$scope.isEditing = false;
		}

		$scope.isSelectedBookmark = function (bookmarkId) {
			return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
		}

		$scope.deleteBookmark = function (bookmarkId) {
			var index = bookmarkId;
			delete $scope.bookmarks[index];
		}

		$scope.startCreating = startCreating;
		$scope.cancelCreating = cancelCreating;
		$scope.startEditing = startEditing;
		$scope.cancelEditing = cancelEditing;
		$scope.shouldShowCreating = shouldShowCreating;
		$scope.shouldShowEditing = shouldShowEditing;
		$scope.createBookmark = createBookmark;
	})
