/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as msRest from '@azure/graph/node_modules/@azure/ms-rest-js';

import { azureResource } from 'azureResource';
import { GraphRbacManagementClient, GraphRbacManagementModels } from '@azure/graph';

export async function getApplications(subscriptions: azureResource.AzureResourceSubscription[], credential: msRest.ServiceClientCredentials): Promise<GraphRbacManagementModels.Application[]> {
	const applications: GraphRbacManagementModels.Application[] = [];
	await Promise.all(subscriptions.map(async subscription => {
		const graphClient = new GraphRbacManagementClient(credential, subscription.tenant);
		let response = await graphClient.applications.list({ filter: 'startswith(displayName,\'chgagnon\')' });
		applications.push(...response);
		while (response.odatanextLink) {
			response = await graphClient.applications.listNext(response.odatanextLink);
			applications.push(...response);
		}
	}));
	return applications;
}

export async function getServicePrincipals(subscriptions: azureResource.AzureResourceSubscription[], credential: msRest.ServiceClientCredentials): Promise<GraphRbacManagementModels.ServicePrincipal[]> {
	const servicePrincipals: GraphRbacManagementModels.ServicePrincipal[] = [];
	await Promise.all(subscriptions.map(async subscription => {
		const graphClient = new GraphRbacManagementClient(credential, subscription.tenant);
		let spnResponse = await graphClient.servicePrincipals.list({ filter: 'startswith(displayName,\'chgagnon\')' });
		servicePrincipals.push(...spnResponse);
		while (spnResponse.odatanextLink) {
			spnResponse = await graphClient.servicePrincipals.listNext(spnResponse.odatanextLink);
			servicePrincipals.push(...spnResponse);
		}
	}));
	return servicePrincipals;
}

export async function createApplication(subscription: azureResource.AzureResourceSubscription, credential: msRest.ServiceClientCredentials): Promise<void> {
	/*
	const graphClient = new GraphRbacManagementClient (credential, subscription.tenant);
	const appResult = await graphClient.applications.create({
		displayName: 'chgagnon-test-app',
		appRoles: [{
			id: '3913510d-42f4-4e42-8a64-420c390055eb'
		}]
	});


	const servicePrincipalResult = await graphClient.servicePrincipals.create({
		appId: appResult.appId
	});
	*/
	// graphClient.applications.patch()
}


