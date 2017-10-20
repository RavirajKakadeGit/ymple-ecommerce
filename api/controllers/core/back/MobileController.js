var async = require('async');

var Promise = require('bluebird');
var pathToService = '../../../services/core/';
var CoreReadDbService = require(pathToService + 'back/CoreReadDbService');
var CoreInsertDbService = require(pathToService + '/back/CoreInsertDbService');
var pathTemplateBackCore = sails.config.globals.templatePathBackCore;
var _ = require('underscore');


module.exports = {



    apiToken: function (req, res){

        var result = {};



        result.pathToInclude = '../mobile/api-token.ejs';

        return res.view(pathTemplateBackCore + 'commun-back/main.ejs', result);


        return res.ok('ok pour api token ');

    },

    edit: function (req, res) {

        var nameModule = req.params.nameModule;

        console.log('ModuleController - edit - nameModule', nameModule);

        var result = {};

        //check if module configuration is in json file

        if (checkIfConfigurationIsInJsonFile(nameModule)) {
            result.templateToInclude = 'edit_module';
            result.pathToInclude = '../module/template/carousel/edit.ejs';
            result.moduleName = nameModule;

            //view_module_payment_'+nameModule; //result.listConfiguration = configurationModule[0].configuration; //[];
            result.listConfiguration = null; //[];//console.log('ModuleController - edit', req.params.nameModule);

            result.nameModule = nameModule;

            return res.view(pathTemplateBackCore + 'commun-back/main.ejs', result);

        } else {

            if (nameModule.toLowerCase() == "paypal") {

                console.log('display paypal edit page');

                result.templateToInclude = 'yes';
                result.pathToInclude = '../module/payment/config-paypal.ejs';
                //view_module_payment_'+nameModule; //result.listConfiguration = configurationModule[0].configuration; //[]; // console.info('listConfiguration', result.listConfiguration);

                console.log('ModuleController - edit', req.params.nameModule);

                result.nameModule = nameModule;

                var categoryModule = 'payment';

                CoreReadDbService.getConfigurationOneModule(categoryModule, nameModule).then(function (configurationModule) {

                    console.log('data configuration paypal', configurationModule);

                    result.configuration = configurationModule[0];

                    return res.view(pathTemplateBackCore + 'commun-back/main.ejs', result);
                })
            }

            else {

                CoreReadDbService.getConfigurationModule(nameModule).then(function (configurationModule) {

                    try {

                        console.log('listconfiguration', configurationModule[0].configuration);
                        result.templateToInclude = 'edit_module';
                        result.pathToInclude = '../module/edit.ejs';
                        //view_module_payment_'+nameModule;

                        result.listConfiguration = configurationModule[0].configuration; //[];

                        console.info('listConfiguration', result.listConfiguration);

                        console.log('ModuleController - edit', req.params.nameModule);

                        result.nameModule = nameModule;

                    }
                    catch (err) {
                        console.log('err', err);
                    }

                    //{userNameApi:'userNameApi',passwordApi:'passwordApi'};

                    return res.view(pathTemplateBackCore + 'commun-back/main.ejs', result);

                });
            }


        }
    }
}

