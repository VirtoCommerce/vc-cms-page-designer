var _defaultContentForImageWithColumns = 'Share blog posts, products, or promotions with your customers. Use this text to describe products, share details on availability and style, or as a space to display recent reviews or FAQs.';

myapp.controller('EditorCtrl', ['$scope', '$timeout', 'defaultSchema', 'presets', 'modelBuilder', 'stack', '$interval', 'theme-editor.cmsgit.api', 'FileUploader', EditorCtrl]);

function EditorCtrl($scope, $timeout, defaultSchema, presets, modelBuilder, stack, $interval, cmsGitApi, FileUploader) {
    'use strict';
    var self = this;

    $scope.previewBlockIsImage = false;
    $scope.previewBlockIsText = false;
    $scope.previewBlockIsImageWithText = false;
    $scope.previewBlockIsImageWithTextOverlay = false;
    $scope.previewBlockIsImageCarousel = false;
    $scope.previewBlockIsTextColumnsWithImages = false;

    $scope.cmsPage = { apiUrl: _apiUrl, storeId: 'Electronics', userName: _userName, fileName: _fileName, pageName: _pageName, apiKey: _apiKey, blocks: [] };
    $scope.originalPage = null;
    $scope.selectedBlock = null;
    $scope.selectedImageBlock = null;
    $scope.selectedOriginalBlock = null;
    $scope.permalinkDuplicated = false;
    $scope.loading = true;

    var page = null;


    initialize();


    $scope.isDirty = function () {
        return !angular.equals($scope.originalPage, $scope.cmsPage);
    }

    $scope.selectImageBlock = function (block) {
        $scope.selectedImageBlock = block;
    }


    function initialize() {
        var uploader = $scope.uploader = new FileUploader({
            scope: $scope,
            headers: { Accept: 'application/json' },
            method: 'POST',
            autoUpload: true,
            removeAfterUpload: true
        });

        uploader.url = _apiUrl2 + 'api/platform/assets?folderUrl=blogs&name=fffffff&api_key=' + _apiKey2;
        //uploader.url = 'api/platform/assets?folderUrl=catalog/' + item.code;

        uploader.onSuccessItem = function (fileItem, assets, status, headers) {
            
        };

        uploader.onErrorItem = function (item, response, status, headers) {
            
        };

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        //uploader.onProgressItem = function (fileItem, progress) {
        //    console.info('onProgressItem', fileItem, progress);
        //};
        //uploader.onProgressAll = function (progress) {
        //    console.info('onProgressAll', progress);
        //};
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.selectedImageBlock.url = response[0].url;
            $('')
            $scope.$apply();
            console.info('onCompleteItem', response[0].url);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        //var pageRequest = cmsGitApi.get(cmsPage);
        cmsGitApi.get($scope.cmsPage).then(function (response) {
            page = JSON.parse(response.data);
            angular.extend($scope.cmsPage.blocks, page);

            $scope.originalPage = JSON.parse(JSON.stringify($scope.cmsPage));

            $scope.settings = $scope.cmsPage.blocks[0];
            $scope.originalSettings = $scope.originalPage.blocks[0];

            reloadPreview();

            $scope.$watch('settings.title', settingTitleChanging);
            $scope.$watch('settings.permalink', settingPermalinkChanging);

            // postmessage event listner
            window.addEventListener('message', function (e) {
                if (e.data && e.data.type) {
                    if (e.data.type === 'sync') {
                        syncCmsPage(e.data);
                    }
                }
            });


            $scope.sortableOptions = {
                // called after a node is dropped
                stop: function (e, ui) {
                    syncBlocksOrder();
                }
            };
        });

        //$(function () {
        //    $("#blockList").sortable();
        //    $("#blockList").disableSelection();
        //});
    }

    function reloadPreview() {
        var pageLink = page[0].permalink;
        if (pageLink === '') {
            pageLink = $scope.cmsPage.pageName;
        }

        document.getElementById('preview').contentWindow.location.href = _storefrontUrl + pageLink;
    }

    function syncCmsPage(cmsPageSyncInfo) {
        var index = 0;
        for (var i = 0; i < $scope.cmsPage.blocks.length; i++) {
            if ($scope.cmsPage.blocks[i].type !== 'settings') {
                if (!$scope.cmsPage.blocks[i].id) {
                    if (cmsPageSyncInfo.blocks[index].id) {
                        $scope.cmsPage.blocks[i].id = cmsPageSyncInfo.blocks[index].id;
                    }
                    else {
                        $scope.cmsPage.blocks[i].id = _tempBlockId++;
                    }
                    if (!$scope.cmsPage.blocks[i].name) {
                        $scope.cmsPage.blocks[i].name = 'New block';
                    }
                }

                index++;
            }
            else {
                if (!$scope.cmsPage.blocks[i].name) {
                    $scope.cmsPage.blocks[i].name = 'Settings';
                }
            }
        }

        $scope.$watch('cmsPage.blocks', syncChanges, true);

        $scope.$apply();
    }

    function syncChanges() {
        var message = { type: 'syncPageBlocks', cmsPage: $scope.cmsPage };

        console.log(message);

        var win = document.getElementById('preview').contentWindow;
        win.postMessage(message, _storefrontUrl);

        $scope.loading = false;
    }

    function syncBlocksOrder() {
        if ($scope.cmsPage) {
            var message = { type: 'updateOrder', blocks: $scope.cmsPage.blocks };
            var win = document.getElementById('preview').contentWindow;
            win.postMessage(message, _storefrontUrl);
        }
    }

    // Convert invalid id
    self.convertName = function (name) {
        return name.toLowerCase().replace(/ /g, "-");
    };

    // Load schema and presets
    defaultSchema.getDefaultSchema()
        .then(function (response) {
            return self.settings = response.data;
        })
        .then(function () {
            return presets.getPresets();
        })
        .then(function (response) {
            return self.presets = response.data;
        })
        .then(function () {
            self.updateModel();
            self.updateStack();
        })
        .then(function () {
            angular.forEach(self.model, function (value, key) {
                $scope.$watch('editor.model[\"' + key + '\"]', function (newValue, oldValue) {
                    if (self.preventWatch) {
                        $timeout(function () {
                            self.preventWatch = false;
                        });
                    } else {
                        stack.push({
                            key: key,
                            value: oldValue
                        });
                    }
                }, true);
            });
        });

    self.updateModel = function () {
        self.preventWatch = true;
        self.model = modelBuilder.modelFromSchema(self.settings, {});
        self.model = modelBuilder.updateModelFromPresets(self.presets, self.model);
        $scope.$broadcast('modelUpdated', self.model);
    };

    self.updateStack = function () {
        stack.clear();
    };

    // Change current preset
    self.openPreset = function (name) {
        self.presets.current = name;
        self.updateModel();
        self.updateStack();
    };

    self.removePreset = function (name) {
        if (name === self.presets.current) {
            self.preventWatch = true;
        }
        presets.removePreset(self.presets, name);
        self.updateModel();
    }

    self.savingPreset = false;

    self.startSavingPreset = function () {
        self.savingPreset = true;
        self.newPresetName = "Preset name";
    };

    self.endSavingPreset = function () {
        self.savingPreset = false;
        self.presets.presets[self.newPresetName] = self.model;
        self.presets.current = self.newPresetName;
    };

    self.cancelSavingPreset = function () {
        var url = _storefrontUrl + $scope.settings.permalink;

        if (!$scope.isDirty()) {
            window.location.href = url;
        }
        else {
            $.confirm({
                title: 'Confirm!',
                content: 'Do you want to discard changes?',
                buttons: {
                    discard: {
                        text: 'Discard',
                        action: function () {
                            window.location.href = url;
                        }
                    },
                    save: {
                        text: 'Save',
                        action: function () {
                            $scope.cmsPage.content = JSON.stringify($scope.cmsPage.blocks);
                            cmsGitApi.set($scope.cmsPage).then(function (response) {
                                if (response.data === 'ok') {
                                    window.location.href = url;
                                }
                                else {
                                    alert('Error during saving');
                                }
                            });
                        }
                    },
                    cancel: {
                        text: 'Cancel',
                        action: function () {

                        }
                    }
                }
            });
        }
    };

    $scope.save = function () {
        if ($scope.isDirty()) {
            var blocks = JSON.parse(JSON.stringify($scope.cmsPage.blocks));
            angular.forEach(blocks, function (item) {
                delete item.id;
            });

            $scope.cmsPage.content = JSON.stringify(blocks);

            cmsGitApi.set($scope.cmsPage).then(function (response) {
                if (response.data === 'ok') {
                    $scope.originalPage = JSON.parse(JSON.stringify($scope.cmsPage));
                    reloadPreview();
                }
                else {
                    alert('Error during saving');
                }
            });
        }
    };

    $scope.publish = function () {
        if ($scope.isDirty()) {
            alert('Save before!');
            return;
        }

        $.confirm({
            title: 'Confirm!',
            content: 'You are about to make this webpage public.',
            buttons: {
                publish: {
                    text: 'Publish',
                    action: function () {
                        cmsGitApi.sendToProduction($scope.cmsPage).then(function (response) {
                            if (response.data === 'ok') {
                                cmsGitApi.refreshProduction($scope.cmsPage).then(function (response) {
                                    if (response.data === 'ok') {
                                        var url = _storefrontMasterUrl + $scope.settings.permalink;
                                        setTimeout(function () { window.open(url, '_blank'); }, 1000);
                                    }
                                    else {
                                        alert('Error during refreshing');
                                    }
                                });
                            }
                            else {
                                alert('Error during publishing');
                            }
                        });
                    }
                },
                cancel: {
                    text: 'Cancel',
                    action: function () {

                    }
                }
            }
        });
    };

    self.undo = function () {
        if (stack.length() > 0) {
            self.preventWatch = true;
            var oldValue = stack.pop();
            self.model[oldValue.key] = oldValue.value;
            $scope.$broadcast('modelUpdated', self.model);
        } else {
        }
    };



    function settingTitleChanging() {
        var win = document.getElementById('preview').contentWindow;

        var message = Object.assign({ type: 'update' }, $scope.cmsPage);

        win.postMessage(message, _storefrontUrl);
    }

    function settingPermalinkChanging() {
        if ($scope.cmsPage && $scope.settings && $scope.cmsPage.fileName) {
            $scope.cmsPage.permalink = $scope.settings.permalink;

            if ($scope.isDirty()) {
                cmsGitApi.isunique($scope.cmsPage).then(function (response) {
                    var result = JSON.parse(response.data);

                    $scope.permalinkDuplicated = !result;
                });
            }
        }
    }

    $scope.cancelSettings = function () {
        $scope.settings.permalink = $scope.originalSettings.permalink;
    }
    $scope.applySettings = function () {
    }

    $scope.previewBlock = function (type) {
        var block = null;

        if (type === 'text') {
            block = { id: 'newblock' + _tempBlockId++, type: type, content: 'Type something', name: 'Text', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = false;
            $scope.previewBlockIsImageWithText = false;
            $scope.previewBlockIsImageWithTextOverlay = false;
            $scope.previewBlockIsImageCarousel = false;
            $scope.previewBlockIsText = true;
            $scope.previewBlockIsTextColumnsWithImages = false;
            $scope.previewBlockIsImagesLayout = false;
        }
        else if (type === 'image') {
            block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Image', url: 'http://download.seaicons.com/icons/sora-meliae/matrilineare/1024/Places-folder-pictures-icon.png', imageSize: 'medium', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = true;
            $scope.previewBlockIsImageWithText = false;
            $scope.previewBlockIsImageWithTextOverlay = false;
            $scope.previewBlockIsImageCarousel = false;
            $scope.previewBlockIsText = false;
            $scope.previewBlockIsTextColumnsWithImages = false;
            $scope.previewBlockIsImagesLayout = false;
        }
        else if (type === 'image-with-text') {
            block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Image with text', url: 'http://download.seaicons.com/icons/sora-meliae/matrilineare/1024/Places-folder-pictures-icon.png', content: 'This is a paragraph where you can describe your chosen product, collection, or blog posts. Add some text to make this block attractive to your customers', align: 'left', imageSize: 'medium', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = false;
            $scope.previewBlockIsImageWithText = true;
            $scope.previewBlockIsImageWithTextOverlay = false;
            $scope.previewBlockIsImageCarousel = false;
            $scope.previewBlockIsText = false;
            $scope.previewBlockIsTextColumnsWithImages = false;
            $scope.previewBlockIsImagesLayout = false;
        }
        else if (type === 'image-with-text-overlay') {
            block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Image with text overlay', sectionHeight: 'medium', url: 'https://cdn2.slidemodel.com/wp-content/uploads/7243-01-low-poly-background-16x9-1.jpg', title: 'Image with text overlay', content: 'This is a subtitle where you can describe what this page is about. Add some text to make this block attractive to your customers', align: 'center', textBackground: false, textBackgroundColor: 'black', textBackgroundOpacityPercent: 50, textBackgroundOpacity: '0.5', blockWidth: 'screen', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = false;
            $scope.previewBlockIsImageWithText = false;
            $scope.previewBlockIsImageWithTextOverlay = true;
            $scope.previewBlockIsImageCarousel = false;
            $scope.previewBlockIsText = false;
            $scope.previewBlockIsTextColumnsWithImages = false;
            $scope.previewBlockIsImagesLayout = false;
        }
        else if (type === 'image-carousel') {
            var images = [
                { active: true, url: 'http://www.flowermeaning.com/flower-pics/Zinnia-4.jpg', title: 'Image content 1', content: 'Tell your story through images' },
                { url: 'https://www.sciencenews.org/sites/default/files/2017/08/main/articles/story-3_main.jpg', title: 'Image content 2', content: 'Tell your story through images' }
            ];
            block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Image carousel', images: images, autoRotate: true, rotationFrequency: '7000', contentSize: 'medium', blockWidth: 'screen', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = false;
            $scope.previewBlockIsImageWithText = false;
            $scope.previewBlockIsImageWithTextOverlay = false;
            $scope.previewBlockIsImageCarousel = true;
            $scope.previewBlockIsText = false;
            $scope.previewBlockIsTextColumnsWithImages = false;
            $scope.previewBlockIsImagesLayout = false;
        }
        else if (type === 'textcolumns-with-images') {
            var columns = [
                { url: 'https://www.infographicdesignteam.com/blog/wp-content/uploads/2016/08/social-media-facebook-post35.jpg', title: 'Column 1', content: _defaultContentForImageWithColumns, width: '33%' },
                { url: 'https://www.infographicdesignteam.com/blog/wp-content/uploads/2016/08/social-media-facebook-post35.jpg', title: 'Column 2', content: _defaultContentForImageWithColumns, width: '33%' },
                { url: 'https://www.infographicdesignteam.com/blog/wp-content/uploads/2016/08/social-media-facebook-post35.jpg', title: 'Column 3', content: _defaultContentForImageWithColumns, width: '33%' }
            ];
            block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Text columns with images', columns: columns, columnCount: '3', imageAlignment: 'top', width: '33%', imageSize: 'medium', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = false;
            $scope.previewBlockIsImageWithText = false;
            $scope.previewBlockIsImageWithTextOverlay = false;
            $scope.previewBlockIsImageCarousel = false;
            $scope.previewBlockIsText = false;
            $scope.previewBlockIsTextColumnsWithImages = true;
            $scope.previewBlockIsImagesLayout = false;
        }
        else if (type === 'images-layout') {
            var images = [
                { url: 'http://www.flowermeaning.com/flower-pics/Zinnia-4.jpg', title: 'Image 1', content: '' },
                { url: 'https://www.sciencenews.org/sites/default/files/2017/08/main/articles/story-3_main.jpg', title: 'Image 2', content: '' },
                { url: 'https://avatars.mds.yandex.net/get-pdb/34158/3f879c3c-4489-4d14-afbe-8dd19049e269/s1200', title: 'Image 3', content: '' }
            ];
            block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Images layout', images: images, layout: 'layout-one-two', ispreview: true };
            $scope.selectedBlock = block;
            $scope.previewBlockIsImage = false;
            $scope.previewBlockIsImageWithText = false;
            $scope.previewBlockIsImageWithTextOverlay = false;
            $scope.previewBlockIsImageCarousel = false;
            $scope.previewBlockIsText = false;
            $scope.previewBlockIsTextColumnsWithImages = false;
            $scope.previewBlockIsImagesLayout = true;
        }

        var message = { type: 'appendBlock', block: block };
        var win = document.getElementById('preview').contentWindow;
        win.postMessage(message, _storefrontUrl);
    }

    $scope.deleteImage = function (item) {
        item.url = '';
        
    }

    $scope.changeTextBackgroundOpacityPercent = function (item) {
        item.textBackgroundOpacity = (item.textBackgroundOpacityPercent / 100).toString();
    }

    $scope.addCarouselImage = function (item) {
        var image = { id: 'i' + _tempBlockId++, url: 'https://www.sciencenews.org/sites/default/files/2017/08/main/articles/story-3_main.jpg', title: 'Image content', content: 'Tell your story through images' };
        item.images.push(image);
    }

    $scope.addColumn = function (item) {
        var column = { id: 'i' + _tempBlockId++, url: 'https://www.infographicdesignteam.com/blog/wp-content/uploads/2016/08/social-media-facebook-post35.jpg', title: 'Column title', content: 'Text', width: item.width };
        item.columns.push(column);
    }

    $scope.removeColumn = function (item, column) {
        var index = item.columns.indexOf(column);
        item.columns.splice(index, 1);

        console.log(item);
    }

    $scope.changeNumberColumns = function (item) {
        var n = item.columnCount * 1;
        var width = '100%';
        if (n == 2) {
            width = '50%';
        }
        else if (n == 3) {
            width = '33%';
        }
        else if (n == 4) {
            width = '25%';
        }

        for (var i = 0; i < item.columns.length; i++) {
            item.columns[i].width = width;
        }

        item.columnCount = n.toString();
        item.width = width;

        console.log(item);
    }

    $scope.appndBlock = function (type) {
        var block = $scope.selectedBlock;

        block.ispreview = false;

        if (type === 'text') {
            //block = { id: 'newblock' + _tempBlockId++, type: type, content: 'Type something', name: 'Text' };
            //$scope.cmsPage.blocks.push(block);
        }
        else if (type === 'image') {
            //block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Image', url: 'http://download.seaicons.com/icons/sora-meliae/matrilineare/1024/Places-folder-pictures-icon.png' };
            //$scope.cmsPage.blocks.push(block);
        }
        else if (type === 'image-with-text') {
            //block = { id: 'newblock' + _tempBlockId++, type: type, name: 'Image with text', url: 'http://download.seaicons.com/icons/sora-meliae/matrilineare/1024/Places-folder-pictures-icon.png', content: 'This is a paragraph where you can describe your chosen product, collection, or blog posts. Add some text to make this block attractive to your customers', align: 'left' };
            //$scope.cmsPage.blocks.push(block);
        }
        else if (type === 'image-with-text') {
            block.url = 'https://cdn2.slidemodel.com/wp-content/uploads/7243-01-low-poly-background-16x9-1.jpg';
            //$scope.cmsPage.blocks.push(block);
        }

        $scope.cmsPage.blocks.push(block);
        $scope.selectedBlock = block;
        $scope.selectedOriginalBlock = Object.assign({}, block);

        $scope.previewBlockIsImage = false;
        $scope.previewBlockIsImageWithText = false;
        $scope.previewBlockIsImageWithTextOverlay = false;
        $scope.previewBlockIsText = false;
        $scope.previewBlockIsTextColumnsWithImages = false;

        //$scope.$apply();

        var message = { type: 'appendBlock', block: block };
        var win = document.getElementById('preview').contentWindow;
        win.postMessage(message, _storefrontUrl);
    }

    $scope.removeBlock = function (block) {
        $.confirm({
            title: 'Confirm!',
            content: 'Are you sure you want to remove the block?',
            buttons: {
                publish: {
                    text: 'Remove',
                    action: function () {
                        var message = { type: 'removeBlock', blockId: block.id };
                        var win = document.getElementById('preview').contentWindow;
                        win.postMessage(message, _storefrontUrl);

                        var index = $scope.cmsPage.blocks.indexOf(block);
                        $scope.cmsPage.blocks.splice(index, 1);

                        $scope.$apply();
                        $scope.closexx();
                    }
                },
                cancel: {
                    text: 'Cancel',
                    action: function () {

                    }
                }
            }
        });
    }

    $scope.allowCloseSettings = function (params) {
        if ($scope.settings.permalink != $scope.originalSettings.permalink) {
            $.confirm({
                title: 'Confirm!',
                content: 'Do you want to discard changes?',
                buttons: {
                    discard: {
                        text: 'Discard',
                        action: function () {
                            $scope.settings.permalink = $scope.originalSettings.permalink;
                            $scope.$apply();

                            $scope.selectedBlock = null;
                            $scope.selectedOriginalBlock = null;

                            $scope.closexx();
                        }
                    },
                    save: {
                        text: 'Save',
                        action: function () {
                            $scope.selectedBlock = null;
                            $scope.selectedOriginalBlock = null;

                            $scope.closexx();
                        }
                    },
                    cancel: {
                        text: 'Cancel',
                        action: function () {

                        }
                    }
                }
            });
        }
        else {
            $scope.closexx();
        }
    }

    $scope.cancelBlockPreview = function () {
        $scope.previewBlockIsImage = false;
        $scope.previewBlockIsImageWithText = false;
        $scope.previewBlockIsImageWithTextOverlay = false;
        $scope.previewBlockIsText = false;
        $scope.previewBlockIsTextColumnsWithImages = false;
        
        $scope.$apply();

        $scope.closexx();

        var message = { type: 'removePreview' };
        var win = document.getElementById('preview').contentWindow;
        win.postMessage(message, _storefrontUrl);
    }

    $scope.cancelImageParam = function (close) {
        if ($scope.selectedBlock.alt != $scope.selectedOriginalBlock.alt) {
            $.confirm({
                title: 'Confirm!',
                content: 'Do you want to discard changes?',
                buttons: {
                    publish: {
                        text: 'Discard',
                        action: function () {

                            $scope.selectedBlock.alt = $scope.selectedOriginalBlock.alt;
                            $scope.$apply();

                            close();
                        }
                    },
                    Save: {
                        text: 'Save',
                        action: function () {
                            $scope.selectedOriginalBlock = Object.assign({}, $scope.selectedBlock);
                            close();
                        }
                    },
                    cancel: {
                        text: 'Cancel',
                        action: function () {

                        }
                    }
                }
            });
        }
        else {
            close();
        }
    }
}

myapp.buildArray = function (name, size) {
    var i, array = [];
    for (i = 1; i <= size; i++) {
        array.push({
            text: name + ' ' + i,
            value: i
        });
    }

    return array;
};

myapp.controller('sortableController', function ($scope) {
    'use strict';

    $scope.list = myapp.buildArray('Item', 5);

    $scope.sortingLog = [];

    $scope.sortableOptions = {
        // called after a node is dropped
        stop: function (e, ui) {
            var logEntry = {
                ID: $scope.sortingLog.length + 1,
                Text: 'Moved element: ' + ui.item.scope().item.text
            };
            $scope.sortingLog.push(logEntry);
        }
    };
});
