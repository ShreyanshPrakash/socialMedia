# socialMedia
Browse through the users, their friends and friends of friends


Api endpoints : All GET methods

    1. getAllUsers : '/restservice/users/getallusers'

        URL = http://localhost:4400//restservice/users/getallusers?page=1&record=4
            page: to determine the page no
            record: to determine the no of records per page to be shown

    2. getUserFriends : '/restservice/users/getuserfriends?'
        
        URL: http://localhost:4400/restservice/users/getuserfriends?userId=1
            userId: unique id for each user


Schema Migration :

    Mysql Workbench comes with a migration tool in-built to help in migration
    https://dev.mysql.com/doc/workbench/en/wb-migration-overview.html


Unit Testing :

    Angular comes with Karma and Jasmine for testing the application.

    ng test : will run the test on the application and open the results in browser
    
    codeCoverage : to create a code coverage report.It creates a coverage folder with all the details.
            -- angular.json 
                    "test":{ 
                        "options":{   
                            "codeCoverage": true 
                        }
                    }
            
            -- terminal : ng test --code-coverage


    using TestBeds : 

        beforeEach(async(() => {    // starts a new test
            TestBed.configureTestingModule({
            declarations: [AppComponent, UserComponent, UserAsyncComponent]  // configure the testbed.
            }).compileComponents();
        }));


    Sample :
        describe('App component', () => {
            beforeEach(async(() => {

            TestBed.configureTestingModule({
            declarations: [AppComponent, UserComponent, UserAsyncComponent]
            }).compileComponents();

        }));

        describe(':', () => {

            function setup() {
                const fixture = TestBed.createComponent(AppComponent);
                const app = fixture.debugElement.componentInstance;
                return { fixture, app };
            }

            it('should create the app', async(() => {
                const { app } = setup();
                expect(app).toBeTruthy();
            }));

            it('should have title as \'Angular7-unit-testing!\'', async(() => {
                const { app } = setup();
                expect(app.title).toBe('Angular7-unit-testing!');      // compare with the expected output
            }));

            it('should have h1 tag as \'Welcome Angulat7-unit-testing!\'', async(() => {
                const { app, fixture } = setup();
                fixture.detectChanges();
                const compile = fixture.debugElement.nativeElement;
                const h1tag = compile.querySelector('h1');
                expect(h1tag.textContent).toBe(' Welcome to Angular7-unit-testing!! ');  // compare with the expected output
            }));
        });
        });