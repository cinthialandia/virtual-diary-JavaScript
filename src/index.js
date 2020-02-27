import router from './router';
import { findOwnersName } from './db'; // importando métodos de la base de datos
import { initWelcomeForm } from './welcome-section';
import { initQuestionForm } from './question-section';

//import { showTodayQuestion } from './question-section';

router
    .on(
        'welcome',
        function() {
            console.log('esta es la pagina de welcome');
            initWelcomeForm();
        },
        {
            before: function(done) {
                const owner = findOwnersName();
                if (owner) {
                    router.navigate('');
                } else {
                    done();
                }
            },
        },
    )
    .on(
        '*',
        function() {
            console.log('Esta es la pagina de home');
            initQuestionForm();
        },
        {
            before: function(done) {
                const owner = findOwnersName();
                if (!owner) {
                    router.navigate('welcome');
                } else {
                    done();
                }
            },
        },
    )
    .resolve();
