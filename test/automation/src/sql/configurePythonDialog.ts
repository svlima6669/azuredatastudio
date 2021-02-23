/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Code } from '../code';
import { Dialog } from './dialog';

const CONFIGURE_PYTHON_DIALOG_TITLE = 'Configure Python to run Python 3 kernel';

export class ConfigurePythonDialog extends Dialog {

	constructor(code: Code) {
		super(CONFIGURE_PYTHON_DIALOG_TITLE, code);
	}

	async waitForConfigurePythonDialog(): Promise<void> {
		await this.waitForNewDialog();
	}

	async installPython(): Promise<void> {
		const dialog = '.modal .modal-dialog .modal-content';
		const newPythonInstallation = `${dialog} .modal-body input[aria-label="New Python installation"]`;
		const dialogButton = `${dialog} .modal-footer .right-footer .footer-button:not(.dialogModal-hidden)`;
		const nextButton = `${dialogButton} a[aria-label="Next"]`;
		const installButton = `${dialogButton} a[aria-label="Install"]`;

		// Page 1
		await this.code.waitAndClick(newPythonInstallation);
		await this.code.waitAndClick(nextButton);

		// Page 2
		await this.code.waitAndClick(installButton);

		await this.waitForDialogGone();
		return this._waitForInstallationComplete();
	}

	private async _waitForInstallationComplete(): Promise<void> {
		const installationCompleteNotification = '.notifications-toasts div[aria-label="Notebook dependencies installation is complete, source: Notebook Core Extensions (Extension), notification"]';
		await this.code.waitForElement(installationCompleteNotification, undefined, 600); // wait up to 1 minute for python installation
	}

}
