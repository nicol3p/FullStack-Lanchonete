module.exports = {
    presets: [
      '@babel/preset-env',   // Transforma o JavaScript moderno para versões compatíveis com navegadores
      '@babel/preset-react'  // Transforma o JSX para JavaScript
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',  // Suporte a propriedades de classe
      '@babel/plugin-syntax-dynamic-import'       // Suporte a importação dinâmica
    ]
  };
  