<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\withMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithHeadings;


class LedgerExport implements  FromArray , withMapping , WithEvents,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $rows ;
    
    public function __construct(array $rows)
    {
        $this->rows= $rows;
    }
    
    function array():array{
        return $this->rows;
    }
    
    public function map ($row):array{
        return[
            $row['docNum'],
            $row['date'],
            $row['debit'],
            $row['credit'],
            $row['description']

        ];       
            
    }
    
      public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
            },
        ];
    }
    public function headings(): array
    {
        return [
            'رقم السند',
            'التاريخ',
            'مدين',
            'الدائن ',
            'البيان'
        ];
    }
    
    
}
