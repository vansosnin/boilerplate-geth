require('babel-register')({
    'presets': [
        [
            'env',
            {
                'targets': {
                    'node': 'current'
                }
            }
        ],
        'react'
    ],
    'plugins': [
        'transform-object-rest-spread',
        'transform-class-properties',
        'transform-export-extensions'
    ]
});
