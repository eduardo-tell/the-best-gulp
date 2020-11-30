var global = {

	start: () => {
		global.test()
	},

	/**
	 * Cria funcionalidade que imprimirá nomes
	 * Para funcionar:
	 * start deve ser chamado em "main.js"
	 *
	 * @return	void
	 * @author	Eduardo Tell
	*/
	 
	test: () => {
		console.log('Inicia test()');
	}
}
