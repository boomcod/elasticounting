/// <reference path="../../../typings/browser/ambient/jquery/jquery.d.ts" />
/// <reference path="../../../typings/browser/ambient/angular/angular.d.ts" />

var CategoryType = {
	Spending: "Spending",
	Income: "Income"
}

class Category {

	id: string;
	name: string;
	group: string;
	keywords: string;
	type: string;

    constructor() {
    } 

    isNew(): boolean {
		return !this.id;
    }

    reset(): void {
		this.id = '';
		this.name = '';
		this.group = '';
		this.keywords = '';
		this.type = CategoryType.Spending;
    }

    deepCopy(): Category {
        return <Category>angular.copy(this);
    }; 

    copyTo(destination: Category): void {
        angular.copy(this, destination);
    };    
}